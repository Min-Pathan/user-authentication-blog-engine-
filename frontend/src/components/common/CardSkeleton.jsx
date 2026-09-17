import { Box, Card, CardContent, Skeleton } from '@mui/material'

const CardSkeleton = ({ count = 3, imageHeight = 220 }) => {
    return (
        <Box
            sx={{
                display: 'grid',
                gridTemplateColumns: {
                    xs: '1fr',
                    sm: "repeat(2, 1fr)",
                    md: "repeat(3, 1fr)"
                },
                gap: 3
            }}>
            {Array.from({
                length: count
            }).map((_, index) => (
                <Card key={index}
                    sx={{
                        borderRadius: 3,
                        overflow: 'hidden',
                        height: '100%'
                    }}>
                    <Skeleton
                        variant='rectangular'
                        width='100%'
                        height={imageHeight}
                        animation='wave'
                    />
                    <CardContent>
                        <Skeleton variant='rounded' width={80} height={24} sx={{ mb: 2 }} />
                        <Skeleton variant='text' width={'70%'} height={32} sx={{ mb: 1 }} />
                        <Skeleton variant="text" width="100%" />
                        <Skeleton variant="text" width="95%" />
                        <Skeleton
                            variant="text"
                            width="75%"
                        />
                        <Box
                            sx={{
                                mt: 3,
                                display: "flex",
                                justifyContent:
                                    "space-between",
                                alignItems: "center",
                            }}
                        >
                            <Box
                                sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: 1,
                                }}
                            >
                                <Skeleton
                                    variant="circular"
                                    width={32}
                                    height={32}
                                />

                                <Skeleton
                                    variant="text"
                                    width={80}
                                />
                            </Box>

                            <Skeleton
                                variant="text"
                                width={70}
                            />
                        </Box>
                    </CardContent>
                </Card>
            ))

            }
        </Box>
    )
}

export default CardSkeleton