GameVault: Decentralized Crowdfunding for Gamers
Welcome to GameVault, a decentralized crowdfunding platform tailored for anyone who wishes to raise funds for a cause, project, trip, and just about anything that matters to them. GameVault leverages blockchain technology to enable transparent and secure fundraising, empowering users with a social and gamified experience even as they bring their financial dreams to life.
Table of Contents
Overview
Key Features
Crowdfunding Campaigns
Contributors
Proposals and Voting
Reward System
Installation
Usage
Contributing
License
Acknowledgements
Overview
GameVault is designed to support the creation and funding of gaming projects through a decentralized autonomous organization (DAO). Users can launch crowdfunding campaigns, contribute funds, create proposals for project improvements, and vote on those proposals. The platform also offers a reward system that allows users to convert points into tokens.
Key Features
1. Crowdfunding Campaigns
Create a Campaign:
Users can create new crowdfunding campaigns by providing essential details such as the project title, description, funding goal, and duration.
Function: createGofundme
Parameters: Creator's address, campaign title, description, funding goal, duration
Returns: Unique campaign ID
Contribute to a Campaign:
Contributors can support a campaign by sending Ether ($ETH). Each contribution is recorded, and the campaign’s funding balance is updated.
Function: contributeEth
Parameters: Campaign ID
Event: ContributeEth
2. Contributors
Track Contributions:
All contributors are tracked, and their contributions are recorded with timestamps. This ensures transparency and allows users to see their involvement in each campaign.
Function: getContributors
Returns: List of contributors and their respective balances
3. Proposals and Voting
Create Proposals:
Both campaign owners and contributors can create proposals to suggest new features or improvements for the campaign.
Function: createProposal
Parameters: Campaign ID, proposal content
Vote on Proposals:
Contributors can vote on active proposals, influencing the direction of the project.
Function: voteOnProposal
Parameters: Campaign ID, proposal ID
Event: VoteCast
4. Reward System
Convert Points to Tokens:
GameVault includes a reward system where users can convert earned points into tokens, which can be transferred or redeemed.
Function: convertPointandTransfer
Parameters: Player’s address, points to be converted
Installation
To get started with GameVault, clone the repository and install the necessary dependencies:
bash
Copy code
# Clone the repository
git clone https://github.com/Dsmalldara/GameVault

# Navigate to the project directory
cd GameVault

# Install dependencies
npm install

Usage
