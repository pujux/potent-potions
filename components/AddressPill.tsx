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
      <div className="px-2 py-0 overflow-hidden text-xs font-medium md:px-3 md:text-sm whitespace-nowrap overflow-ellipsis">
        {balance} ETH
      </div>
      <div className="flex items-center py-2 pl-2 text-xs font-medium text-black bg-white rounded-full md:pl-3 md:px-1 md:text-sm">
        {ensName !== null ? ensName : splitAddress}
        <div className="mx-1 md:ml-2">
          <Davatar
            size={20}
            address={address}
            generatedAvatarType="jazzicon" // optional, 'jazzicon' or 'blockies'
          />
        </div>
      </div>
    </div>
  );
};

export default AddressPill;
