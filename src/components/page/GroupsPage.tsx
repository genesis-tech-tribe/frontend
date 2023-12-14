import { GroupList } from '@/features/groups/components/GroupList';
import { IGroup } from '@/features/groups/types/definition';
import { fetchGroupList } from '@/lib/api/data';

import React from 'react';

export const GroupsPage = async () => {
  const groups: IGroup[] = await fetchGroupList();
  return (
    <>
      GroupsPage
      <GroupList groups={groups} />
    </>
  );
};
