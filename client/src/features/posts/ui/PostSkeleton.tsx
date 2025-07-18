import {
  HStack,
  Skeleton,
  SkeletonCircle,
  SkeletonText,
  Stack,
} from "@chakra-ui/react";

export const PostSkeleton = () => {
  return (
    <Stack
      gap={4}
      w="lg"
      borderWidth="1px"
      borderColor="gray.800"
      borderRadius="md"
      py="4"
      mb="4"
    >
      <PostHeader />
      <Skeleton height="512px" width="512px" />
      <PostFooter />
    </Stack>
  );
};

const PostHeader = () => {
  return (
    <HStack px={4}>
      <SkeletonCircle size={10} />
      <SkeletonText noOfLines={1} />
    </HStack>
  );
};

const PostFooter = () => {
  return (
    <Stack px={4}>
      <SkeletonText noOfLines={3} />
    </Stack>
  );
};
