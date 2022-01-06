const main = async () => {
    const mediaContractFactory = await hre.ethers.getContractFactory("MediaShare");
    const mediaContract = await mediaContractFactory.deploy();
    await mediaContract.deployed();
    console.log("Contract addy:", mediaContract.address);

    let contractBalance = await hre.ethers.provider.getBalance(
        mediaContract.address
    );
    console.log(
        "Contract balance:",
        hre.ethers.utils.formatEther(contractBalance)
    );

    const mediaTxn = await mediaContract.sendMedia("https://youtube.com/2391209");
    await mediaTxn.wait();

    const [firstPerson, randomPerson] = await hre.ethers.getSigners();
    let firstPersonBalance = await hre.ethers.provider.getBalance(firstPerson.address);
    console.log(
        "First Person balance previous:",
        hre.ethers.utils.formatEther(firstPersonBalance)
    );

    let secondPersonBalance = await hre.ethers.provider.getBalance(randomPerson.address);
    console.log(
        "Second Person balance previous:",
        hre.ethers.utils.formatEther(secondPersonBalance)
    );

    let allMedias = await mediaContract.getAllMedias();
    mediaTxn2 = await mediaContract.connect(randomPerson).thankMedia(allMedias[0].id,  {value: hre.ethers.utils.parseEther("1")});
    await mediaTxn2.wait(); // Wait for the transaction to be mined

    firstPersonBalance = await hre.ethers.provider.getBalance(firstPerson.address);
    console.log(
        "First Person balance:",
        hre.ethers.utils.formatEther(firstPersonBalance)
    );
    secondPersonBalance = await hre.ethers.provider.getBalance(randomPerson.address);
    console.log(
        "Second Person balance:",
        hre.ethers.utils.formatEther(secondPersonBalance)
    );

    allMedias = await mediaContract.getAllMedias();
    console.log(allMedias);

    let allThanks = await mediaContract.getThanksByAddress(randomPerson.address);
    console.log(allThanks);
};

const runMain = async () => {
    try {
        await main();
        process.exit(0);
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
};

runMain();
