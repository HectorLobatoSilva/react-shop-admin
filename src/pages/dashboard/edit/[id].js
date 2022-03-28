import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import FormProduct from "@components/FormProduct";
import { makeFetch } from "@hooks/useFetch";
import endPoints from "@services/api";

export default function Edit() {
    const [product, setProduct] = useState({});
    const router = useRouter();

    useEffect(() => {
        const { id } = router.query;
        if (!router.isReady) return;
        async function getProduct() {
            try {
                const response = await makeFetch(endPoints.products.getProduct(id));
                const product = await response.json();
                setProduct(product);
            } catch (error) {
                router.back();
            }
        }
        getProduct();
    }, [router?.isReady]);

    return (
        <>
            <FormProduct product={product} />;
        </>
    );
}
