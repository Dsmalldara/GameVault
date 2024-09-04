// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";

/// @title GameVault Token (GMV)
/// @dev ERC20 token with 18 decimals, burnable functionality, and a fixed total supply of 10 million tokens.
contract GameVaultToken is ERC20, ERC20Burnable {
    uint256 public constant TOTAL_SUPPLY = 10_000_000 * 10 ** 18;

    /// @notice Constructor for GameVault Token (GMV)
    /// @dev Mints the total supply of tokens to the deployer's address.
    constructor() ERC20("GameVault Token", "GMV") {
        _mint(msg.sender, TOTAL_SUPPLY);
    }
}

struct GoFund {
    uint id_;
    string title;
    string description;
    uint256 fundingGoal;
    address owner;
    uint startTime;
    uint256 durationTime;
    bool isActive;
    uint256 fundingBalance;
    address[] contributors;
    bytes32[] proposals;
    mapping(bytes32 => uint256) proposalVotes;
}

struct Contributors {
    address contributor;
    uint balance;
    uint time;
}

contract Gamefund {
    GameVaultToken gameVaultToken; // Address of gameVault Token
    uint public id;
    uint public num =  5;
    uint public denum = 100; // uint256 public conversionRate = (points * 5 ) / 100; // Points to token Conversion (1 point  = 0.005 token)
    address admin = 0xfed257209796EeC486f2A1c0AF1B330857E463c4;

    mapping(uint => GoFund) public funder;
    mapping(address => mapping(uint => Contributors)) public contributors_;
    mapping(uint => mapping(address => uint)) public contribute;
    mapping(uint => mapping(address => bool)) public hasContributed;
    mapping(uint => mapping(address => uint256)) public votingPower;

    uint[] public activeCampaignsIds;

    error InsufficientInput();
    error NotActive();
    error NotActiveCause();
    error ExceededFundingGoal();
    error NotInDuration();
    error NotOwner();
    error TimeNotReached();
    error InvalidProposal();
    error NoVotingPower();

    event CreateGofundme(
        uint id,
        string _title,
        uint256 _fundingGoal,
        uint256 _durationTime
    );

    event ContributeEth(
        uint indexed _ID,
        uint _fundingBalance,
        address contributor,
        uint amount
    );
    event GetContributedFunds(uint indexed _ID, bool isActive);
    event ProposalCreated(uint indexed _ID, bytes32 proposal);
    event VoteCast(uint indexed _ID, bytes32 proposal, uint256 votingPower);
    event TokensTransferred(address indexed recipient, uint256 points, uint256 tokenAmount);

    modifier onlyOwner() {
        require(msg.sender == admin, "Only contract creator");
        _;
    }

    constructor(address _gameVaultToken) {
        gameVaultToken = GameVaultToken(_gameVaultToken);
    }

    function createGofundme(
        address creator,
        string memory _title,
        string memory _description,
        uint256 _fundingGoal,
        uint256 _durationTime
    ) external returns (uint _id) {
        id++;
        _id = id;
        GoFund storage newFund = funder[_id];

        newFund.id_ = _id;
        newFund.title = _title;
        newFund.description = _description;
        newFund.fundingGoal = _fundingGoal;
        newFund.owner = creator;
        newFund.startTime = block.timestamp;
        newFund.durationTime = _durationTime + block.timestamp;
        newFund.isActive = true;

        // push to the active campaign

        activeCampaignsIds.push(_id);

        emit CreateGofundme(_id, _title, _fundingGoal, _durationTime);
    }

    function contributeEth(uint _ID) external payable {
        if (msg.value <= 0.001 ether) revert InsufficientInput();
        GoFund storage fund = funder[_ID];
        if (!fund.isActive) revert NotActive();
        if (fund.fundingBalance + msg.value > fund.fundingGoal)
            revert ExceededFundingGoal();
        if (block.timestamp > fund.durationTime) revert NotInDuration();

        Contributors storage contributorInfo = contributors_[msg.sender][_ID];
        contributorInfo.time = block.timestamp;

        fund.fundingBalance += msg.value;
        contribute[_ID][msg.sender] += msg.value;

        if (!hasContributed[_ID][msg.sender]) {
            fund.contributors.push(msg.sender);
            hasContributed[_ID][msg.sender] = true;
        }

        // Calculate voting power
        uint256 totalRaised = fund.fundingBalance;
        uint256 contribution = contribute[_ID][msg.sender];
        votingPower[_ID][msg.sender] = (totalRaised * 10) / contribution;

        emit ContributeEth(_ID, fund.fundingBalance, msg.sender, msg.value);
    }

    function createProposal(uint _ID, bytes32 proposal) external {
        GoFund storage fund = funder[_ID];
        if (msg.sender != fund.owner) revert NotOwner();

        fund.proposals.push(proposal);
        emit ProposalCreated(_ID, proposal);
    }

    function voteOnProposal(uint _ID, bytes32 proposal) external {
        GoFund storage fund = funder[_ID];
        if (votingPower[_ID][msg.sender] == 0) revert NoVotingPower();

        bool validProposal = false;
        for (uint i = 0; i < fund.proposals.length; i++) {
            if (fund.proposals[i] == proposal) {
                validProposal = true;
                break;
            }
        }
        if (!validProposal) revert InvalidProposal();

        // Cast vote based on voting power
        fund.proposalVotes[proposal] += votingPower[_ID][msg.sender];

        emit VoteCast(_ID, proposal, votingPower[_ID][msg.sender]);
    }

    function getContributedFunds(uint _ID) external {
        GoFund storage fund = funder[_ID];
        if (!fund.isActive) revert NotActiveCause();
        if (msg.sender != fund.owner) revert NotOwner();
        if (fund.durationTime > block.timestamp) revert TimeNotReached();
        
        uint _bal = fund.fundingBalance;
        fund.fundingBalance = 0;
        fund.isActive = false;
        payable(fund.owner).transfer(_bal);

        emit GetContributedFunds(_ID, false);
    }

    function getContributors(uint _ID) external view returns (Contributors[] memory _contributors) {
        GoFund storage fund = funder[_ID];
        uint total = fund.contributors.length;

        _contributors = new Contributors[](total);

        for (uint i = 0; i < total; i++) {
            address contributor = fund.contributors[i];
            uint amount = contribute[_ID][contributor];
            uint time = contributors_[contributor][_ID].time;

            _contributors[i] = Contributors(contributor, amount, time);
        }
    }
    
    function getAllCampaignsCount() external view returns (uint) {
        return id;
    }

    function getCampaigns() external view returns (uint[] memory) {
        return activeCampaignsIds;
    }

    function getStatus(uint _ID) external view returns (bool) {
        return funder[_ID].isActive;
    }

    function convertPointandTransfer(address player, uint points) external onlyOwner {
        require (points > 20, "Points must be greater than zero");

        // calculate the token amount based on the conversion rate 
        uint256 conversionRate = (points * num) / denum;

        // setting the token amount to the conversion rate
        uint256 tokenAmount = conversionRate;

        // Transfer the calculated token amount based on the conversion rate
        require(gameVaultToken.transfer(player, tokenAmount), "Token Transfer failed");

        emit TokensTransferred(player, points, tokenAmount);
    }

    function updateNum(uint256 newNum) external onlyOwner {
        num = newNum;
    }
}
