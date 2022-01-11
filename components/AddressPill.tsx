import Davatar from "@davatar/react";
import { LogoutIcon } from "@heroicons/react/solid";
import Button from "./Button";

interface IProps {
  address: string;
  balance: string;
  ensName: string | null;
  handleLogout: () => void;
}

const AddressPill: React.FC<IProps> = ({
  address,
  balance,
  ensName,
  handleLogout,
}) => {
  const splitAddress =
    address?.substr(0, 6) +
    `....` +
    address?.substr(address.length - 5, address.length - 1);

  return (
    <div className="inline-flex items-center bg-gray-100 rounded-full dark:text-black">
      <div className="py-2 pl-4 pr-2 overflow-hidden text-sm font-medium whitespace-nowrap overflow-ellipsis">
        {balance} MATIC
      </div>
      <a
        target={"_blank"}
        href={`https://polygonscan.com/address/${address}`}
        rel="noreferrer"
      >
        <div className="flex items-center px-4 py-2 text-sm font-bold text-black bg-white rounded-full">
          {ensName !== null ? ensName : splitAddress}
        </div>
      </a>
      <Button
        type="button"
        style={{ padding: 10 }}
        className="inline-flex items-center text-white transition-all duration-200 bg-gray-100 rounded-full"
        onClick={handleLogout}
      >
        <LogoutIcon fill="#000000" className="w-4 h-4" />
      </Button>
    </div>
  );
};

export default AddressPill;
