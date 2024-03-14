import { useForm } from "react-hook-form";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import Spinner from "../../ui/Spinner";
import { useQuerySettings } from "./useQuerySettings";
import { useEditSetting } from "./useEditSettings";
import styled from "styled-components";
import Button from "../../ui/Button";

const Label = styled.label`
  font-weight: 500;
`;

const Error = styled.span`
  font-size: 1.4rem;
  color: var(--color-red-700);
`;

function UpdateSettingsForm() {
  const {
    isLoading,
    settings: {
      breakfast_price,
      max_booking_length,
      max_guests_per_booking,
      min_booking_length,
    } = {},
  } = useQuerySettings();

  const { register, handleSubmit, formState, reset } = useForm();

  const { isEditing, editSettings } = useEditSetting();
  const { errors } = formState;

  function onSubmit(data) {
    const newSettings = {
      breakfast_price: data.breakfastPrice,
      max_booking_length: data.maxNights,
      max_guests_per_booking: data.maxGuests,
      min_booking_length: data.minNights,
    };

    console.table(newSettings);

    editSettings(
      { editedSetting: newSettings },
      {
        onSuccess: (data) => reset(),
      }
    );
  }

  function onError(errors) {
    console.log(errors);
  }

  if (isLoading) return <Spinner />;

  return (
    <Form onSubmit={handleSubmit(onSubmit, onError)}>
      <FormRow>
        <Label htmlFor="minNights">Min Nights</Label>
        <Input
          type="number"
          id="minNights"
          defaultValue={min_booking_length}
          {...register("minNights", {
            required: "This field is required",
          })}
        />
        {errors?.minNights?.message && <Error>{errors.name.message}</Error>}
      </FormRow>
      <FormRow>
        <Label htmlFor="maxNights">Max Nights</Label>
        <Input
          type="number"
          id="maxNights"
          defaultValue={max_booking_length}
          {...register("maxNights", {
            required: "This field is required",
          })}
        />
        {errors?.maxNights?.message && <Error>{errors.name.message}</Error>}
      </FormRow>
      <FormRow>
        <Label htmlFor="maxGuests"> Max Guests </Label>
        <Input
          type="number"
          id="maxGuests"
          defaultValue={max_guests_per_booking}
          {...register("maxGuests", {
            required: "This field is required",
          })}
        />
        {errors?.maxGuests?.message && <Error>{errors.name.message}</Error>}
      </FormRow>
      <FormRow>
        <Label htmlFor="breakfastPrice">Breakfast Price</Label>
        <Input
          type="number"
          id="breakfastPrice"
          defaultValue={breakfast_price}
          {...register("breakfastPrice", {
            required: "This field is required",
          })}
        />
        {errors?.breakfastPrice?.message && (
          <Error>{errors.name.message}</Error>
        )}
      </FormRow>
      <Button disabled={isEditing}>Update Settings</Button>
    </Form>
  );
}

export default UpdateSettingsForm;
