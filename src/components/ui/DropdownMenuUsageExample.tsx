'use client';
/**
 * This file is used as an example for the Dropdown components.
 * Once we're done with the example, we can delete this file.
 */
import { DeleteIcon, MenuKebabIcon, PenIcon } from '@/assets/images/icons';
import { ContainerCount } from '@/features/groups/components/GroupCardList/ContainerCount';
import { UserCount } from '@/features/groups/components/GroupCardList/UserCount';

import {
  Button,
  Card,
  DropdownMenu,
  DropdownMenuButton,
  DropdownMenuButtonIcon,
  DropdownMenuButtonText,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  Icon,
} from '.';

export const DropdownMenuUsageExample = () => {
  return (
    <div className="p-4 flex flex-col gap-3">
      {Array.from({ length: 10 }).map((_, i) => (
        <DropDownMenuWithCardExample key={i} />
      ))}
    </div>
  );
};

const DropDownMenuWithCardExample = () => {
  const handleRenameClick = () => {
    alert('Rename clicked!');
  };

  const handleDeleteClick = () => {
    alert('Delete clicked!');
  };
  return (
    <Card asChild>
      {/* Needed fixed height to give kebab-menu button h-full height */}
      <div className="h-[5.25rem] flex items-center justify-between">
        {/* 100%(card's width, with left padding already distracted) - 0.5rem(8px,gap between left content and kebab button) - 3rem(48px,kebab button width) */}
        <div className="w-[calc(100%-3.5rem)] flex flex-col gap-3 pl-4 py-2">
          <span className="text-lg">Group name</span>
          <div className="w-full flex justify-between items-center">
            <ContainerCount containerCount={3} />
            <UserCount userCount={3} />
          </div>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="h-full">
              {/* size 4.5 is not working for this kebab icon... not sure why */}
              <Icon icon={MenuKebabIcon} size={5} />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem asChild>
              <DropdownMenuButton onClick={handleRenameClick}>
                <DropdownMenuButtonIcon>
                  <Icon icon={PenIcon} size={5} color="primary" />
                </DropdownMenuButtonIcon>
                <DropdownMenuButtonText>Rename</DropdownMenuButtonText>
              </DropdownMenuButton>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <DropdownMenuButton onClick={handleDeleteClick}>
                <DropdownMenuButtonIcon>
                  <Icon icon={DeleteIcon} size={5} color="danger" />
                </DropdownMenuButtonIcon>
                <DropdownMenuButtonText>Delete</DropdownMenuButtonText>
              </DropdownMenuButton>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </Card>
  );
};
