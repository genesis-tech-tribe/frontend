import { IconPen } from '@/assets/images/icons';
import {
  DropdownMenuButton,
  DropdownMenuButtonIcon,
  DropdownMenuButtonText,
  DropdownMenuContent,
  DropdownMenuItem,
  Icon,
} from '@/components/ui';
import { IContainer } from '@/types/definition';

import { DeleteContainerDialogTriggerButton } from './DeleteContainerDialogTriggerButton';

interface IContainerCardDropdownMenuContent {
  /**
   * An identifier of a container which a user willing to delete
   */
  containerId: IContainer['id'];
  /**
   * The function to open rename form input field
   */
  onRenameClick: () => void;
  /**
   * The function to close dropdown menu
   */
  onDropdownMenuClose: () => void;
}

export const ContainerCardDropdownMenuContent = ({
  containerId,
  onRenameClick,
  onDropdownMenuClose,
}: IContainerCardDropdownMenuContent) => {
  /**
   * The function that is called when the dropdown menu is selected
   * e.preventDefault() prevents the dropdown menu from closing when selecting that item
   * This is necessary because closing dropdown menu also closes the dialog unintentionally
   * @see {@link https://www.radix-ui.com/primitives/docs/components/dropdown-menu#item}
   * @param e - The event object
   * @returns void
   * */
  const handleSelect = (e: Event) => {
    e.preventDefault();
  };

  return (
    <DropdownMenuContent>
      <DropdownMenuItem asChild>
        <DropdownMenuButton onClick={onRenameClick}>
          <DropdownMenuButtonIcon>
            <Icon icon={IconPen} size={5} color="primary" />
          </DropdownMenuButtonIcon>
          <DropdownMenuButtonText>Rename</DropdownMenuButtonText>
        </DropdownMenuButton>
      </DropdownMenuItem>
      <DropdownMenuItem onSelect={handleSelect}>
        <DeleteContainerDialogTriggerButton
          containerId={containerId}
          onDropdownMenuClose={onDropdownMenuClose}
        />
      </DropdownMenuItem>
    </DropdownMenuContent>
  );
};
