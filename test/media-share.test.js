const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("MediaShare", function () {
  describe("#sendMedia", function () {
    it("Should increase total medias", async function () {
      const MediaShare = await ethers.getContractFactory("MediaShare");
      const MediaShareContract = await MediaShare.deploy();
      await MediaShareContract.deployed();

      await MediaShareContract.sendMedia("kksuhsdk");

      expect(await MediaShareContract.getTotalMedias()).to.equal(1);
    });
  });
  describe("#thankMedia", function () {
    it("Should send thanks to media sender", async function () {
      const MediaShare = await ethers.getContractFactory("MediaShare");
      const MediaShareContract = await MediaShare.deploy();
      await MediaShareContract.deployed();
      const [owner, otherSigner] = await ethers.getSigners();
      
      await MediaShareContract.connect(otherSigner).sendMedia("cjbksbdk");
      const firstMedia = await MediaShareContract.medias(0);
      await MediaShareContract.connect(owner).thankMedia(firstMedia.id);
      const thanks = await MediaShareContract.getThanksByAddress(owner.address);

      expect(thanks.length).to.equal(1);
    });

    it("Should have proper thanked and thanker", async function () {
      const MediaShare = await ethers.getContractFactory("MediaShare");
      const MediaShareContract = await MediaShare.deploy();
      await MediaShareContract.deployed();
      const [owner, otherSigner] = await ethers.getSigners();
      
      await MediaShareContract.connect(otherSigner).sendMedia("cjbksbdk");
      const firstMedia = await MediaShareContract.medias(0);
      await MediaShareContract.connect(owner).thankMedia(firstMedia.id);
      const thanks = await MediaShareContract.getThanksByAddress(owner.address);

      expect(thanks[0].thanker).to.equal(owner.address);
      expect(thanks[0].thanked).to.equal(otherSigner.address);
    });
  });
});
