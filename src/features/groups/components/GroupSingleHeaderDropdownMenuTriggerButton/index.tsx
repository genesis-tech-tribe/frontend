'use client';
import { HeaderMenuCircleButton } from '@/components/parts/Header';
import { DropdownMenu, DropdownMenuTrigger } from '@/components/ui';
import { IGroup } from '@/types/definition';

import { useState } from 'react';

import { GroupSingleHeaderDropdownMenuContent } from './GroupSingleHeaderDropdownMenuContent';

interface IGroupSingleHeaderDropdownMenuTriggerButton {
  /**
   * an identifier of a group which a user is willing to either delete or rename
   */
  groupId: IGroup['id'];
}

export const GroupSingleHeaderDropdownMenuTriggerButton = ({
  groupId,
}: IGroupSingleHeaderDropdownMenuTriggerButton) => {
  const [isDropdownMenuOpen, setIsDropdownMenuOpen] = useState(false);

  return (
    <DropdownMenu open={isDropdownMenuOpen} onOpenChange={setIsDropdownMenuOpen}>
      <DropdownMenuTrigger asChild>
        <HeaderMenuCircleButton />
      </DropdownMenuTrigger>
      <GroupSingleHeaderDropdownMenuContent
        groupId={groupId}
        onDropdownMenuClose={() => setIsDropdownMenuOpen(false)}
      />
    </DropdownMenu>
  );
};