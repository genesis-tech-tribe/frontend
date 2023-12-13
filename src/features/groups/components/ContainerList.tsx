import { Card, Icon } from '@/components/ui';
import { fetchContainerList } from '@/lib/api/data';

import { IContainer } from '../types/definition';

export default async function ContainerList({ id }: { id: string }) {
  const containers: IContainer[] = await fetchContainerList(id);
  return (
    <>
      Container
      {/* <MenuMeatBall /> */}
      {/* <MenuPlus /> */}
      {containers.map((container) => (
        <Card key={container.id}>
          <div className="flex gap-4 items-center">
            <div className="flex items-center justify-center bg-accent rounded-full w-11 h-11">
              <Icon iconName="container" color="black" />
            </div>
            {container.name}
          </div>
        </Card>
      ))}
    </>
  );
}
