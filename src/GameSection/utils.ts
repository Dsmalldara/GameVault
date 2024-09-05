
export const questions:questionType = [
    {
      question: "What does DeFi stand for?",
      options: ["Decentralized Finance", "Defined Finance", "Digital Finance", "Deformed Finance"],
      answer: "Decentralized Finance"
    },
    {
      question: "Which is a popular DeFi protocol?",
      options: ["Uniswap", "Coinbase", "Robinhood", "Binance"],
      answer: "Uniswap"
    },
    {
      question: "What is the primary purpose of a liquidity pool in DeFi?",
      options: [
        "To provide liquidity for trading pairs",
        "To store cryptocurrency securely",
        "To calculate blockchain transactions",
        "To mine new coins"
      ],
      answer: "To provide liquidity for trading pairs"
    },
    {
      question: "Which of the following is NOT a DeFi platform?",
      options: ["Aave", "Compound", "Ethereum", "Venmo"],
      answer: "Venmo"
    },
    {
      question: "What is yield farming?",
      options: [
        "A method to grow crops using blockchain",
        "A way to earn rewards by staking or lending crypto assets",
        "A process of creating new blockchain protocols",
        "A service for exchanging different cryptocurrencies"
      ],
      answer: "A way to earn rewards by staking or lending crypto assets"
    },
    {
      question: "Which token standard is commonly used for DeFi tokens on Ethereum?",
      options: ["ERC-20", "ERC-721", "BEP-2", "TRC-10"],
      answer: "ERC-20"
    },
    {
      question: "What does AMM stand for in DeFi?",
      options: ["Automated Money Maker", "Automated Market Maker", "Anonymous Market Maker", "Automated Mining Machine"],
      answer: "Automated Market Maker"
    },
    {
      question: "What is impermanent loss?",
      options: [
        "A loss that is temporary until the market recovers",
        "Losses incurred when tokens are staked in a DeFi pool",
        "A reduction in value due to volatile market prices",
        "A drop in the value of a cryptocurrency due to hacking"
      ],
     answer:  "A reduction in value due to volatile market prices"
    },
    {
      question: "Which of the following is a decentralized exchange (DEX)?",
      options: ["Kraken", "Binance", "Uniswap", "Coinbase"],
      answer: "Uniswap"
    },
    {
      question: "What is the role of an oracle in DeFi?",
      options: [
        "To provide price feeds  to smart contracts",
        "To mine new tokens",
        "To validate blockchain transactions",
        "To manage decentralized applications (dApps)"
      ],
      answer: "To provide price feeds to smart contracts"
    },
    {
      question: "Which DeFi platform is known for flash loans?",
      options: ["Aave", "Compound", "SushiSwap", "Yearn Finance"],
      answer: "Aave"
    },
    {
      question: "What is staking in the context of DeFi?",
      options: [
        "Buying and holding cryptocurrencies in a wallet",
        "Locking up funds in a protocol to earn rewards",
        "Trading cryptocurrencies on an exchange",
        "Creating new tokens"
      ],
      answer: "Locking up funds in a protocol to earn rewards"
    },
    {
      question: "Which consensus mechanism is most commonly associated with DeFi platforms on Ethereum?",
      options: ["Proof of Work", "Proof of Stake", "Delegated Proof of Stake", "Proof of Authority"],
      answer: "Proof of Stake"
    },
    {
      question: "What is a stablecoin?",
      options: [
        "A cryptocurrency pegged to a stable asset like the US dollar",
        "A coin used to pay transaction fees on blockchains",
        "A type of DeFi loan",
        "A coin used exclusively for yield farming"
      ],
      answer: "A cryptocurrency pegged to a stable asset like the US dollar"
    },
    {
      question: "What is 'slippage' in the context of DeFi trading?",
      options: [
        "The difference between the price of a trade and the actual executed price",
        "A type of cryptocurrency wallet",
        "A process of staking rewards",
        "A method for calculating yield"
      ],
      answer:    "The difference between the price of a trade and the actual executed price"
    }
  ];

  interface questionInfo  {
    question: string;
    options: string[];
    answer: string;
  }
 export  type questionType = questionInfo[]

