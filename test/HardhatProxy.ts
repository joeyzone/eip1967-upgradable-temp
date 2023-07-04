import {
  time,
  loadFixture,
} from "@nomicfoundation/hardhat-toolbox/network-helpers";
import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs";
import { expect } from "chai";
import { ethers, upgrades } from "hardhat";
import { Contract } from "ethers";

describe("Hardhat Tool to Version upgrade", async () => {
  let ver1: Contract;
  let ver2: Contract;
  beforeEach(async () => {
    const Ver1 = await ethers.getContractFactory("Version1");

    ver1 = await upgrades.deployProxy(Ver1, [12], {
      initializer: "init",
    });
    await ver1.deployed();
  });
  it("should be upgrade right", async () => {
    const Ver2 = await ethers.getContractFactory("Version2");
    const proxyVer2 = await upgrades.upgradeProxy(ver1, Ver2);
    await proxyVer2.mintX(10);
    expect(await proxyVer2.x()).to.equal(30);
  });

  it("should be change admin right", async () => {
    const [owner, otherAccount] = await ethers.getSigners();
    const Ver2 = await ethers.getContractFactory("Version2");
    const proxyVer2 = await upgrades.upgradeProxy(ver1, Ver2);
    // console.log(Object.keys(proxyVer2), proxyVer2.erc1967.);
    await upgrades.admin.changeProxyAdmin(
      proxyVer2.address,
      otherAccount.address
    );
    expect(await upgrades.erc1967.getAdminAddress(proxyVer2.address)).to.equal(
      otherAccount.address
    );
  });
});
