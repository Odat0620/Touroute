import { memo, VFC } from "react";
import { useHistory } from "react-router-dom";
import { Box, Flex, IconButton, Text } from "@chakra-ui/react";
import { Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/menu";
import { DeleteIcon } from "@chakra-ui/icons";
import moment from "moment";
import { VscEllipsis } from "react-icons/vsc";
import { useRecoilValue } from "recoil";

import { AvatarAndName } from "../../molecules/users/AvatarAndName";
import { signInUserState } from "../../../store/auth";
import { DeleteAlert } from "../DeleteAlert";

type Props = {
  text: string;
  createdAt: Date;
  user: { id: number; name: string; avatar: { url?: string } };
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  onClickDelete: () => Promise<void>;
};

export const ShowComment: VFC<Props> = memo((props) => {
  const { text, createdAt, user, isOpen, setIsOpen, onClickDelete } = props;
  const currentUser = useRecoilValue(signInUserState);

  const history = useHistory();

  const onClickUser = () => {
    history.push(`/users/${user.id}`);
  };

  return (
    <>
      <Box w="100%" pt={4} px={6} bg="blue.50" borderRadius={8}>
        <Text color="gray.700" textAlign="left">
          {text}
        </Text>
        <Flex justify="flex-end" align="center" my={3}>
          <Text mr={6} color="gray.500">
            {moment(createdAt).format("YYYY年MM月DD日 H:mm")}
          </Text>
          <AvatarAndName name={user.name} avatarUrl={user.avatar.url} onClick={onClickUser} />
          {currentUser.id === user.id && (
            <Menu>
              <MenuButton
                as={IconButton}
                icon={<VscEllipsis />}
                variant="outline"
                ml="10px"
                h="30px"
                borderRadius="50"
              />
              <MenuList minW={100}>
                <MenuItem icon={<DeleteIcon />} color="red" onClick={() => setIsOpen(true)}>
                  削除
                </MenuItem>
              </MenuList>
            </Menu>
          )}
        </Flex>
      </Box>

      <DeleteAlert isOpen={isOpen} onClose={() => setIsOpen(false)} onClickDelete={onClickDelete}>
        コメントを削除
      </DeleteAlert>
    </>
  );
});
