import Navbar from "../layout-components/Navbar";

export default function layout({ children }) {
  return (
    <div className="min-h-screen grid grid-rows-12">
      <Navbar />
      <main className="row-span-11">{children}</main>
    </div>
  );
}
