import ControllerConnector from "@cartridge/connector";
import { Policy } from "@cartridge/controller";
import { Connector } from "@starknet-react/core";

const policies: Policy[] = [
  {
    target: '0x20b3efe3ee5116904f4e08ca391715c5bf6703f630b6e91677010e308aebfc1',
    method: "spawn",
  },
  {
    target: '0x20b3efe3ee5116904f4e08ca391715c5bf6703f630b6e91677010e308aebfc1',
    method: "decrease_stats",
  },
  {
    target: '0x20b3efe3ee5116904f4e08ca391715c5bf6703f630b6e91677010e308aebfc1',
    method: "feed",
  },
  {
    target: '0x20b3efe3ee5116904f4e08ca391715c5bf6703f630b6e91677010e308aebfc1',
    method: "sleep",
  },
  {
    target: '0x20b3efe3ee5116904f4e08ca391715c5bf6703f630b6e91677010e308aebfc1',
    method: "awake",
  },
  {
    target: '0x20b3efe3ee5116904f4e08ca391715c5bf6703f630b6e91677010e308aebfc1',
    method: "play",
  },
  {
    target: '0x20b3efe3ee5116904f4e08ca391715c5bf6703f630b6e91677010e308aebfc1',
    method: "clean",
  },
  {
    target: '0x20b3efe3ee5116904f4e08ca391715c5bf6703f630b6e91677010e308aebfc1',
    method: "revive",
  },
]

// Configuración básica del conector
const cartridgeConnector = new ControllerConnector({
  policies,
  rpc: "https://api.cartridge.gg/x/babybeasstv2/katana",
}) as never as Connector;

export default cartridgeConnector;
