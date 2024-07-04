import { yupResolver } from "@hookform/resolvers/yup";
import { ReactNode, useEffect } from "react";
import { FormProvider, UseFormReturn, useForm } from "react-hook-form";
import { ObjectSchema } from "yup";

export interface MockFormProps<T = any> {
  initValues: T | undefined;
  resolver?: ObjectSchema<any>;
  children?: ReactNode;
  onInitForm?: (methods: UseFormReturn) => void;
  onSubmit: () => void;
}

export interface MockHandleValueProps {
  name: string;
}

const MockForm = (props: MockFormProps) => {
  const { initValues, resolver, children, onInitForm, onSubmit } = props;
  const methods = useForm({
    reValidateMode: "onSubmit",
    defaultValues: initValues,
    resolver: resolver ? yupResolver(resolver) : undefined,
  });

  useEffect(() => {
    if (onInitForm) onInitForm(methods);
  }, []);

  return (
    <FormProvider {...methods}>
      <form noValidate onSubmit={methods.handleSubmit(onSubmit)}>
        {children}
        <button type="submit" data-testid="submit-button">
          Submit
        </button>
      </form>
    </FormProvider>
  );
};

export default MockForm;
