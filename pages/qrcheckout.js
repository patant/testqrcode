import Head from "next/head";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

export default function QrCheckout() {
  const router = useRouter();
  const { productId } = router.query;
  const [checkout, setCheckout] = useState();
  useEffect(() => {
    if (!productId) {
      return;
    }
    const fetchCheckout = async () => {
      const response = await fetch(`/api/checkout?productId=${productId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      const checkout = await response.json();
      console.log(checkout);
      setCheckout(checkout);
      var checkoutContainer = document.getElementById("kco-container");
      checkoutContainer.innerHTML = checkout.html_snippet;
      var scriptsTags = checkoutContainer.getElementsByTagName("script");
      // This is necessary otherwise the scripts tags are not going to be evaluated
      for (var i = 0; i < scriptsTags.length; i++) {
        var parentNode = scriptsTags[i].parentNode;
        var newScriptTag = document.createElement("script");
        newScriptTag.type = "text/javascript";
        newScriptTag.text = scriptsTags[i].text;
        parentNode.removeChild(scriptsTags[i]);
        parentNode.appendChild(newScriptTag);
      }
    };
    fetchCheckout();
  }, [productId]);

  return (
    <div>
      <Head>
        <title>Brink QR code</title>
        <meta name="description" content="Brinkcommerce QR code test" />
      </Head>

      <main>
        <p>Checkout for Brinkcommerce QR code test. Running on the demo</p>

        <p>
          Product: {checkout && <p>{checkout.order_lines.find(p => p.type ==='physical').name}</p>}
        </p>
        <p id="kco-container"></p>
      </main>
    </div>
  );
}
