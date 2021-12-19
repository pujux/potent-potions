const Spinner = () => {
  return (
    <div className="flex items-center justify-center">
      <div
        className="w-4 h-4 ease-linear border-2 border-t-2 border-gray-800 rounded-full  loader"
      />
      <style jsx>
        {`
          .loader {
            border-top-color: white;
            animation: spinner 0.6s linear infinite;
          }

          @keyframes spinner {
            0% {
              transform: rotate(0deg);
            }
            100% {
              transform: rotate(360deg);
            }
          }
        `}
      </style>
    </div>
  )
}

export default Spinner
