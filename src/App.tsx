import { Stack, Checkbox } from "@chakra-ui/react";
import "./App.css";
import { useGetDummyListQuery } from "./services/dummyApi";
import { useForm } from "react-hook-form";

function App() {
  // const { data, error, isLoading } = useGetDummyListQuery();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const onSubmit = (data: any) => console.log(data);

  return (
    <div style={{ backgroundColor: "yellow" }} className='App'>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={5} direction='row'>
          {dummy_1.map((item) => {
            return (
              <Checkbox
                value={item.id}
                defaultChecked={dummy.includes(item.id)}
                {...register("chooseCb")}
              >
                {item.name}
              </Checkbox>
            );
          })}
        </Stack>
        <button>submit</button>
      </form>
    </div>
  );
}

export default App;

const dummy_1 = [
  {
    name: "felan",
    id: "1",
  },
  {
    name: "besar",
    id: "2",
  },
];
const dummy = ["1"];
