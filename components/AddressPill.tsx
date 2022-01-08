import Davatar from "@davatar/react";

interface IProps {
  address: string;
  balance: string;
  ensName: string | null;
}

const AddressPill: React.FC<IProps> = ({ address, balance, ensName }) => {
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
    </div>
  );
};

export default AddressPill;
