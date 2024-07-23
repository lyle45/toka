import { computed, reactive, type UnwrapRef, watch } from 'vue';

export interface Field<T = string> {
  name: string;
  value: T;
  label: string;
  errorMsg: string;
  rows?: number;
  type: FieldTypes;
  dropdownItems?: DropdownItem[];
  placeholder?: string;
}

export enum FieldTypes {
  input = 'input',
  textarea = 'textarea',
  date = 'date',
  dropdown = 'dropdown',
}

export interface DropdownItem {
  value: string;
  label: string;
}

export function useField<T = string>(initialValue: T, errorMsg: string = '') {
  const field = reactive({
    value: initialValue,
    pristine: true,
    error: '',
  });

  watch(
    () => field.value,
    () => {
      field.pristine = false;
    },
    {
      once: true,
    }
  );

  watch(
    () => [field.value, field.pristine],
    () => {
      field.error = !field.pristine && !field.value ? errorMsg : '';
    }
  );

  return field;
}

export function useForm<T = string>(fields: Field<T>[]) {
  const formFields = fields.reduce(
    (acc, field) => {
      acc[field.name] = useField(field.value, field.errorMsg);
      return acc;
    },
    {} as Record<string, ReturnType<typeof useField<T>>>
  );

  const formPristine = computed(() => Object.values(formFields).every((field) => field.pristine));

  const formInvalid = computed(() => Object.values(formFields).some((field) => !field.value));

  const getFieldValues = () =>
    fields.reduce(
      (acc, field) => {
        acc[field.name] = formFields[field.name].value;
        return acc;
      },
      {} as Record<string, UnwrapRef<T>>
    );

  return { formFields, formPristine, formInvalid, getFieldValues };
}
