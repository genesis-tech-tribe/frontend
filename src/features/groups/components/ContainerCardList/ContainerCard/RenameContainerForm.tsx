import { ContainerIcon } from '@/assets/images/icons';
import { Card, Icon, SquareTextInput } from '@/components/ui';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/Form';
import { renameContainerFormSchema, RenameContainerInputs } from '@/features/groups/lib/schemas';

import { zodResolver } from '@hookform/resolvers/zod';
import { KeyboardEvent, useEffect, useRef } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';

export const RenameContainerForm = ({
  currentContainerName,
  isOpen,
  onClose,
}: {
  currentContainerName: string;
  isOpen: boolean;
  onClose: () => void;
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const form = useForm<z.infer<typeof renameContainerFormSchema>>({
    resolver: zodResolver(renameContainerFormSchema),
    defaultValues: {
      containerName: currentContainerName,
    },
  });

  const processSubmit: SubmitHandler<RenameContainerInputs> = async (
    values: RenameContainerInputs,
  ) => {
    const { containerName } = values;
    if (containerName === currentContainerName) return;
  };

  /**
   * Handle the key down event.
   * when the escape key is pressed, close the form without the submission.
   * @param event - The keyboard event
   */
  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Escape') {
      onClose();
    }
  };

  /**
   * Clear the input value.
   */
  const handleClearInput = () => {
    form.setValue('containerName', '');
  };

  /**
   * Handle the outside click event.
   * process the form submission and close the form.
   */
  const handleOutsideClick = () => {
    // process the form submission
    processSubmit(form.getValues());
    onClose();
  };

  useEffect(() => {
    if (!isOpen) form.reset();
  }, [isOpen, form]);

  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus();
    }
  }, [isOpen]);

  return (
    <Card asChild>
      <div className="flex gap-4 items-center pl-4 py-2">
        <div className="flex items-center justify-center bg-accent rounded-full w-11 h-11">
          <Icon icon={ContainerIcon} color="black" size={6} />
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(processSubmit)} className="w-full mr-2">
            <FormField
              control={form.control}
              name="containerName"
              render={({ field }) => (
                <FormItem className="">
                  <FormControl>
                    <SquareTextInput
                      {...field}
                      ref={inputRef}
                      onKeyDown={handleKeyDown}
                      handleClearInput={handleClearInput}
                      handleOutsideClick={handleOutsideClick}
                      className={`${
                        form.formState.errors.containerName && 'border-danger'
                      } text-md`}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            ></FormField>
          </form>
        </Form>
      </div>
    </Card>
  );
};
