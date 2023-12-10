import { IContainer } from '@/features/group/types/definition';
import { IUser } from '@/features/group/types/definition';
import { fetchContainerList } from '@/lib/api/data';
import { fetchUserList } from '@/lib/api/data';

import { IGroup } from '../types/definition';
import ContainersCount from './ContainersCount';
import UserCount from './UserCount';
export default async function GroupItem({ group }: { group: IGroup }) {
  const containers: IContainer[] = await fetchContainerList(group.groupId);
  const users: IUser[] = await fetchUserList(group.groupId);
  return (
    <div key={group.groupId}>
      <span>{group.groupId} </span>
      <span>{group.groupName} </span>
      <ContainersCount containerCount={containers.length} />
      <UserCount userCount={users.length} />
    </div>
  );
}
