'use client';
import { IconMenuKebab } from '@/assets/images/icons';
import { Button, DialogRoot, DropdownMenu, DropdownMenuTrigger, Icon } from '@/components/ui';
import { DeleteGroupDialogContent } from '@/features/groups/components/DeleteGroupDialogContent';
import { useAutoFocus } from '@/hooks';
import { IGroup } from '@/types/definition';

import { useState } from 'react';

import { GroupCardDropdownMenuContent } from './GroupCardDropdownMenuContent';

interface IGroupCardMenuButtonProps {
  /**
   * The ID of the group to be deleted.
   */
  groupId: IGroup['id'];
  /**
   * Function to handle the rename button click.
   */
  handleRenameClick: () => void;
  /**
   * A state of renaming input field to be opened (=true) or closed(=false)
   */
  isRenameFormOpen: boolean;
}

export const GroupCardDropdownMenu = ({
  groupId,
  handleRenameClick,
  isRenameFormOpen,
}: IGroupCardMenuButtonProps) => {
  const [isDropdownMenuOpen, setIsDropdownMenuOpen] = useState(false);
  const [isDeleteGroupDialogOpen, setIsDeleteGroupDialogOpen] = useState(false);

  const kebabRef = useAutoFocus<HTMLButtonElement>(!isDeleteGroupDialogOpen && !isRenameFormOpen);

  const handleDeleteClick = () => {
    setIsDropdownMenuOpen(false);
    setIsDeleteGroupDialogOpen(true);
  };
  return (
    <>
      <DropdownMenu open={isDropdownMenuOpen} onOpenChange={setIsDropdownMenuOpen}>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="w-12" ref={kebabRef}>
            <Icon icon={IconMenuKebab} size={4.5} />
          </Button>
        </DropdownMenuTrigger>
        <GroupCardDropdownMenuContent
          handleRenameClick={handleRenameClick}
          handleDeleteClick={handleDeleteClick}
        />
      </DropdownMenu>
      <DialogRoot open={isDeleteGroupDialogOpen} onOpenChange={setIsDeleteGroupDialogOpen}>
        <DeleteGroupDialogContent
          groupId={groupId}
          onParentClose={() => setIsDropdownMenuOpen(false)}
          onDialogClose={() => setIsDeleteGroupDialogOpen(false)}
        />
      </DialogRoot>
    </>
  );
};
