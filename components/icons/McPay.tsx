import { SVGProps } from "react";
const SvgComponent = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={203.209}
    height={144}
    viewBox="0 0 152.407 108"
    {...props}
  >
    <path
      d="M0 0h152.407v108H0z"
      style={{
        fill: "none",
      }}
    />
    <path
      d="M60.412 25.697h31.5v56.606h-31.5z"
      style={{
        fill: "#ff5f00",
      }}
    />
    <path
      d="M382.208 306a35.938 35.938 0 0 1 13.75-28.303 36 36 0 1 0 0 56.606A35.938 35.938 0 0 1 382.208 306Z"
      style={{
        fill: "#eb001b",
      }}
      transform="translate(-319.796 -252)"
    />
    <path
      d="M454.203 306a35.999 35.999 0 0 1-58.245 28.303 36.005 36.005 0 0 0 0-56.606A35.999 35.999 0 0 1 454.203 306ZM450.769 328.308v-1.16h.467v-.235h-1.19v.236h.468v1.159Zm2.31 0v-1.398h-.364l-.42.962-.42-.962h-.365v1.398h.258v-1.054l.393.908h.267l.394-.91v1.056Z"
      style={{
        fill: "#f79e1b",
      }}
      transform="translate(-319.796 -252)"
    />
  </svg>
);
export default SvgComponent;
