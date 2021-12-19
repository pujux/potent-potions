import Image from 'next/image'

const ChestCloseup = () => {
  return (
    <div className="relative flex flex-col items-center justify-center h-full">
      <div id="chest" style={{ marginTop: '-10vh' }}>
        <Image src="/assets/s1-chest.png" alt="chest" width="960" height="540" />
        <div className="absolute top-0 " style={{ transform: 'scale(0.8)' }}>
          <div className="cursor-pointer" onClick={(e) => console.log('mint')}>
            <Image src="/assets/s1-gem-red-mint.png" alt="gem red" width="960" height="540" />
          </div>
        </div>
      </div>
      <style jsx>
        {`
          #chest {
            animation-name: floating;
            animation-iteration-count: infinite;
            animation-timing-function: ease-in-out;
            animation-duration: 3s;
          }

          @keyframes floating {
            0% {
              transform: translate(0%, -7.5%);
            }
            45% {
              transform: translate(0, 10%);
            }
            100% {
              transform: translate(0%, -7.5%);
            }
          }
        `}
      </style>
    </div>
  )
}

export default ChestCloseup
