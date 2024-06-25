import React, { useEffect, useState } from 'react';
import { Box, Stack } from "@chakra-ui/react";
import Card from './Card';

const Home = () => {
    const [key, setKey] = useState("");
    const [order, setOrder] = useState(null);

    useEffect(() => {
        const fetchKey = async () => {
            try {
                const response = await fetch("http://www.localhost:5000/api/getkey");
                if (!response.ok) {
                    // Check if the response is not okay (HTTP status code is not in the range 200-299)
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                const data = await response.json();
                setKey(data.key);
            } catch (error) {
                console.error("Error fetching key:", error);
                // Handle the error here, such as displaying a message to the user
            }
        };
        
        fetchKey();
    }, []);

    const checkoutHandler = async (amount) => {
        try {
            const response = await fetch("/api/payment/checkout", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ amount })
            });
            const data = await response.json();
            setOrder(data.order);

            const options = {
                key,
                amount: data.order.amount,
                currency: "INR",
                name: "6 Pack Programmer",
                description: "Tutorial of RazorPay",
                image: "https://avatars.githubusercontent.com/u/25058652?v=4",
                order_id: data.order.id,
                callback_url: "http://localhost:5000/api/payment/paymentverification",
                prefill: {
                    name: "Prutha vithsni",
                    email: "pruthavithani5889@gmail.com",
                    contact: "6353797920"
                },
                notes: {
                    "address": "Razorpay Corporate Office"
                },
                theme: {
                    "color": "#121212"
                }
            };
            const razor = new window.Razorpay(options);
            razor.open();
        } catch (error) {
            console.error("Error during checkout:", error);
        }
    }

    return (
        <Box>
            <Stack h={"100vh"} alignItems="center" justifyContent="center" direction={["column", "row"]}>
                <Card amount={5000} img={"https://cdn.shopify.com/s/files/1/1684/4603/products/MacBookPro13_Mid2012_NonRetina_Silver.png"} checkoutHandler={checkoutHandler} />
                <Card amount={3000} img={"http://i1.adis.ws/i/canon/eos-r5_front_rf24-105mmf4lisusm_32c26ad194234d42b3cd9e582a21c99b"} checkoutHandler={checkoutHandler} />
            </Stack>
        </Box>
    )
}

export default Home;
