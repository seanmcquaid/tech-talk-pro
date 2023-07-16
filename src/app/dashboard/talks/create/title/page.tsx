'use client';
import PageWrapper from '@/components/PageWrapper';
import { Typography, Button, Input } from 'antd';
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';

const formSchema = z.object({
  prompt: z.string().nonempty(),
});

const SelectTitlePage = () => {
  const { handleSubmit, control } = useForm<z.infer<typeof formSchema>>({
    defaultValues: {
      prompt: '',
    },
  });

  const onSubmit = handleSubmit(values => {
    console.log(values);
  });

  return (
    <PageWrapper>
      <Typography.Title>{'Time to figure out your title!'}</Typography.Title>
      <form onSubmit={onSubmit}>
        <Controller
          name="prompt"
          control={control}
          render={({ field }) => <Input {...field} />}
        />
        <Button htmlType="submit">{'Prompt'}</Button>
      </form>
    </PageWrapper>
  );
};

export default SelectTitlePage;
