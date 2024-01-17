import dynamic from "next/dynamic";
import Image from "next/image";

const NoSSR = dynamic(() => import("./components/App"), { ssr: false });

export default function Home() {
  return <NoSSR />;
}
