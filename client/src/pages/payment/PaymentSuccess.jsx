import { Box, Heading, Text, VStack, Flex, Button } from '@chakra-ui/react'
import React from 'react'
import { useSearchParams, Link } from "react-router-dom"

const PaymentSuccess = () => {
    const searchQuery = useSearchParams()[0]
    const referenceNum = searchQuery.get("reference")

    return (
        <Box className='bg-[#B0EBB4]'>
            <VStack h="100vh" justifyContent={"center"}>
                <Flex className='flex' alignItems="center" justifyContent="center">
                    <Flex flexDirection="column" alignItems="center">
                        <Heading className='text-5xl' textTransform={"uppercase"}>Payment Successful</Heading>
                        <Text className='font-bold text-xl'>Reference No. {referenceNum}</Text>
                        <Button as={Link} to="/" mt={4} colorScheme="teal">Done</Button>
                    </Flex>
                    <Box ml={5}>
                        <img src="https://niceillustrations.com/wp-content/uploads/2021/03/Successful-Payment-color-800px.png" alt="Successful Payment" />
                    </Box>
                </Flex>
            </VStack>
        </Box>
    )
}

export default PaymentSuccess
