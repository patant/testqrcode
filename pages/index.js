import Head from "next/head";
import styles from "../styles/Home.module.css";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

export default function Home() {
  return (
    <div>
      <Head>
        <title>Brink QR code</title>
        <meta name="description" content="Brinkcommerce QR code test" />
      </Head>

      <main>
        <h2>This is a small demo with QR code checkout</h2>
        Products is from Brinkcommerce demo environment.
        ex.
        Adidas Fun Run Size 39: 656d8323-a629-4316-aa8d-65173d68b8a0
      </main>
    </div>
  );
}
