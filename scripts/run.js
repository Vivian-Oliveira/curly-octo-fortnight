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

    const mediaTxn2 = await mediaContract.sendMedia("https://youtube.com/23321");
    await mediaTxn2.wait();

    contractBalance = await hre.ethers.provider.getBalance(mediaContract.address);
    console.log(
        "Contract balance:",
        hre.ethers.utils.formatEther(contractBalance)
    );

    let allMedias = await mediaContract.getAllMedias();
    console.log(allMedias);
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
