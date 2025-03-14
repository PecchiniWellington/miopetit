/* eslint-disable @typescript-eslint/no-explicit-any */
const Google = (props: any) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={20}
    height={20}
    fill="none"
    className="flex items-center justify-center"
    {...props}
  >
    <mask
      id="a"
      width={30}
      height={30}
      x={0}
      y={0}
      maskUnits="userSpaceOnUse"
      className="flex items-center justify-center"
      style={{
        maskType: "alpha",
      }}
    >
      <path fill="#fff" d="M19.97 0H.03v20h19.94V0Z" />
    </mask>
    <g fillRule="evenodd" clipRule="evenodd" mask="url(#a)">
      <path
        fill="#4285F4"
        d="M19.571 10.227c0-.709-.063-1.39-.181-2.045H10v3.868h5.366a4.602 4.602 0 0 1-1.99 3.018v2.51h3.222c1.886-1.742 2.973-4.305 2.973-7.35Z"
      />
      <path
        fill="#34A853"
        d="M10 20c2.692 0 4.948-.895 6.598-2.422l-3.222-2.509c-.893.6-2.035.954-3.376.954-2.597 0-4.795-1.759-5.58-4.123H1.09v2.591c1.64 3.268 5.012 5.51 8.91 5.51Z"
      />
      <path
        fill="#FBBC05"
        d="M4.421 11.9c-.2-.6-.313-1.241-.313-1.9 0-.659.114-1.3.313-1.9V5.509H1.09A10.02 10.02 0 0 0 .03 10c0 1.614.385 3.141 1.06 4.491L4.42 11.9Z"
      />
      <path
        fill="#EA4335"
        d="M10 3.977c1.463 0 2.777.505 3.81 1.496l2.86-2.868C14.945.991 12.688 0 10 0 6.102 0 2.73 2.241 1.09 5.509L4.42 8.1C5.205 5.736 7.403 3.977 10 3.977Z"
      />
    </g>
  </svg>
);
export default Google;
