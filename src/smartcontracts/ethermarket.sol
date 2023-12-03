// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Store {
    struct Item {
        string details;
        uint256 price;
        address owner;
    }

    mapping(uint256 => Item[]) private storeItems;
    mapping(address => uint256) private userBalances;

    address public owner;

    event ItemAdded(uint256 indexed storeId, string details, uint256 price);
    event ItemPurchased(uint256 indexed storeId, uint256 indexed itemId, address buyer, uint256 price);

    modifier onlyOwner() {
        require(msg.sender == owner, "Not the owner");
        _;
    }

    constructor() {
        owner = msg.sender;
    }

    function getBalance() public view returns (uint256) {
        return userBalances[msg.sender];
    }

    function addItem(uint256 storeId, string memory details, uint256 price) public onlyOwner {
        require(bytes(details).length > 0, "Item details cannot be empty");
        require(price > 0, "Price must be greater than 0");
        storeItems[storeId].push(Item(details, price, owner));

        emit ItemAdded(storeId, details, price);
    }

    function viewStoreItems(uint256 storeId) public view returns (Item[] memory) {
        return storeItems[storeId];
    }

    function purchaseItem(uint256 storeId, uint256 itemId) public payable {
        require(storeItems[storeId].length > 0, "Store not found");
        require(itemId < storeItems[storeId].length, "Item not found");

        Item storage item = storeItems[storeId][itemId];

        require(msg.value >= item.price, "Insufficient funds");

        // Update balances
        userBalances[item.owner] += item.price;
        userBalances[msg.sender] -= item.price;

        // Transfer ownership and funds
        item.owner = msg.sender;
        payable(owner).transfer(msg.value);

        emit ItemPurchased(storeId, itemId, msg.sender, item.price);
    }
}
