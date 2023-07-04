import {
  time,
  loadFixture,
} from "@nomicfoundation/hardhat-toolbox/network-helpers";
import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs";
import { expect } from "chai";
import { ethers, upgrades } from "hardhat";
import { Contract } from "ethers";

describe("Proxy1967", () => {
  let ver1: Contract;
  let ver2: Contract;
  let owner;
  let otherAccount;

  beforeEach(async () => {
    [owner, otherAccount] = await ethers.getSigners();
    const Ver1 = await ethers.getContractFactory("Ver1");
    ver1 = await Ver1.deploy();
    const Ver2 = await ethers.getContractFactory("Ver2");
    ver2 = await Ver2.deploy();
    await Promise.all[(ver1.deployed(), ver2.deployed())];
  });

  describe("Deployment", () => {
    it("should be deploy right", async () => {
      const CustomProxy = await ethers.getContractFactory("ContractProxy");
      const _data = await ver1.interface.encodeFunctionData("init", [12]);
      let proxy = await CustomProxy.deploy(ver1.address, _data);
      await proxy.deployed();
      proxy = ver1.attach(proxy.address);
      expect(await proxy.connect(otherAccount).x()).to.be.equal(12);
    });
    it("should be update right", async () => {
      const CustomProxy = await ethers.getContractFactory("ContractProxy");
      let proxy = await CustomProxy.deploy(ver1.address, "0x");
      await proxy.deployed();

      await proxy.upgradeTo(ver2.address);
      proxy = ver2.attach(proxy.address);
      await proxy.connect(otherAccount).mintX(100);
      expect(await proxy.connect(otherAccount).x()).to.equal(300);
    });
  });
});
