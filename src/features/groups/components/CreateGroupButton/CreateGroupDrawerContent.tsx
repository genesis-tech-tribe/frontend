import {
  Button,
  DrawerBody,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  Input,
} from '@/components/ui';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/Form';

import { zodResolver } from '@hookform/resolvers/zod';
import { FC, useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';

import { createGroup } from '../../lib/actions';
import { createGroupFormSchema, CreateGroupInputs } from '../../lib/schemas';

interface ICreateGroupDrawerContentProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CreateGroupDrawerContent: FC<ICreateGroupDrawerContentProps> = ({
  isOpen,
  onClose,
}) => {
  const form = useForm<z.infer<typeof createGroupFormSchema>>({
    resolver: zodResolver(createGroupFormSchema),
    defaultValues: {
      groupName: '',
    },
  });

  /**
   * Process the form submission.
   * @param values - The form values
   */
  const processSubmit: SubmitHandler<CreateGroupInputs> = async (values) => {
    const { groupName } = values;
    const result = await createGroup({ groupName });
    if (!result.ok) {
      alert('Failed to create the group');
    } else {
      alert('Successfully created the group');
      form.reset();
      onClose();
    }
  };

  /**
   * Reset the form when the drawer is closed.
   */
  useEffect(() => {
    if (!isOpen) form.reset();
  }, [isOpen, form]);

  return (
    <DrawerContent side="bottom">
      <DrawerHeader>
        <DrawerTitle>Create Group</DrawerTitle>
      </DrawerHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(processSubmit)}>
          <DrawerBody>
            <FormField
              control={form.control}
              name="groupName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel required>Group name</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            ></FormField>
          </DrawerBody>
          <DrawerFooter>
            <DrawerClose asChild>
              <Button variant="cancel" size="md">
                Cancel
              </Button>
            </DrawerClose>
            <Button type="submit" variant="primary" size="md">
              Create
            </Button>
          </DrawerFooter>
        </form>
      </Form>
    </DrawerContent>
  );
};
