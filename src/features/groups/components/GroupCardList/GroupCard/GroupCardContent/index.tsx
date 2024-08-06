'use client';
import { Card } from '@/components/ui';
import { IGroup } from '@/types/definition';

import Link from 'next/link';
import { FC, useState } from 'react';

import { ContainerCount } from './ContainerCount';
import { GroupCardDropdownMenu } from './GroupCardDropdownMenu';
import { RenameGroupForm } from './RenameGroupForm';
import { UserCount } from './UserCount';

interface IGroupCardContentProps {
  /**
   * the identifier of a group
   */
  groupId: IGroup['id'];
  /**
   * a group name used to display on each card
   */
  groupName: IGroup['name'];
  /**
   * the number of container which belongs to a group
   */
  containerCount: number;
  /**
   * the number of user who belongs to a group
   */
  userCount: number;
}

export const GroupCardContent: FC<IGroupCardContentProps> = ({
  groupId,
  groupName,
  containerCount,
  userCount,
}) => {
  const [isRenameFormOpen, setIsRenameFormOpen] = useState(false);

  const handleRenameClick = () => {
    setIsRenameFormOpen(true);
  };

  const handleRenameFormClose = () => {
    setIsRenameFormOpen(false);
  };

  return isRenameFormOpen ? (
    <RenameGroupForm
      groupId={groupId}
      currentGroupName={groupName}
      containerCount={containerCount}
      userCount={userCount}
      isOpen={isRenameFormOpen}
      onClose={handleRenameFormClose}
    />
  ) : (
    <Card className="flex justify-between gap-2">
      <Link href={`/groups/${groupId}`} className="flex grow flex-col gap-3 pl-4 py-2">
        <span className="text-lg leading-6">{groupName}</span>
        <div className="w-full flex justify-between items-center">
          <ContainerCount containerCount={containerCount} />
          <UserCount userCount={userCount} />
        </div>
      </Link>
      <GroupCardDropdownMenu
        groupId={groupId}
        handleRenameClick={handleRenameClick}
        isRenameFormOpen={isRenameFormOpen}
      />
    </Card>
  );
};
