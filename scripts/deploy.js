const main = async () => {
    const mediaContractFactory = await hre.ethers.getContractFactory("MediaShare");
    const mediaContract = await mediaContractFactory.deploy();

    await mediaContract.deployed();

    console.log("mediaPortal address: ", mediaContract.address);
};

const runMain = async () => {
    try {
        await main();
        process.exit(0);
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};

runMain();
