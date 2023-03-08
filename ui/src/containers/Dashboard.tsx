import React from 'react';
import { Box, Stack, TextField, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import { createDockerDesktopClient } from '@docker/extension-api-client';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { Doughnut } from 'react-chartjs-2';
import { faker } from '@faker-js/faker';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

export const barOptions = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: true,
      text: 'Very Important Container Data',
    },
  },
};

const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

export const barData = {
  labels,
  datasets: [
    {
      label: 'Important Dataset 1',
      data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
    },
    {
      label: 'Important Dataset 2',
      data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
      backgroundColor: 'rgba(53, 162, 235, 0.5)',
    },
  ],
};

export const doughData = {
  labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
  datasets: [
    {
      label: '# of Votes',
      data: [12, 19, 3, 5, 2, 3],
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(255, 159, 64, 0.2)',
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)',
      ],
      borderWidth: 1,
    },
  ],
};

type Props = {};

const client = createDockerDesktopClient();
function useDockerDesktopClient() {
  return client;
}

const Dashboard = (props: Props) => {
  const [response, setResponse] = React.useState<string>();
  const [containers, setContainers] = React.useState<any[]>([]);
  const ddClient = useDockerDesktopClient();


  // React.useEffect(() => {
  //   // List all containers
  //   ddClient.docker.cli.exec('ps', ['--all', '--format', '"{{json .}}"']).then((result) => {
  //     // result.parseJsonLines() parses the output of the command into an array of objects
  //     setContainers(result.parseJsonLines());
  //   });
  // }, []);

  const fetchAndDisplayResponse = async () => {
    try {
      const result = await ddClient.extension.vm?.service?.get('/hello');
      setResponse(JSON.stringify(result));
    } catch (e: any) {
      setResponse(e.message);
    }
  };

  const fetchContainers = () => {
    ddClient.docker.cli.exec('ps', ['--all', '--format', '"{{json .}}"']).then((result) => {
      setContainers(result.parseJsonLines());
    });
  }



  return (
    <Box>
      {/* // <Typography variant='h3'>Docker extension demo</Typography>
      //{' '} */}

      <Bar options={barOptions} data={barData} />

      <Typography
        variant='body1'
        color='text.secondary'
        sx={{ mt: 2 }}>
        This is a basic page rendered with MUI, using Docker's theme. Read the
        MUI documentation to learn more. Using MUI in a conventional way and
        avoiding custom styling will help make sure your extension continues to
        look great as Docker's theme evolves.
      </Typography>
      <Typography
        variant='body1'
        color='text.secondary'
        sx={{ mt: 2 }}>
        Pressing the below button will trigger a request to the backend. Its
        response will appear in the textarea.
      </Typography>
      <Stack
        direction='row'
        alignItems='start'
        spacing={2}
        sx={{ mt: 4 }}>
        <Button
          variant='contained'
          onClick={() => fetchContainers()}>
          Call backend
        </Button>

        <TextField
          label='Backend response'
          sx={{ width: 480 }}
          disabled
          multiline
          variant='outlined'
          minRows={5}
          value={JSON.stringify(containers, undefined, 2) ?? ''}/>
      </Stack>

      <Doughnut data={doughData} />;

    </Box>
  );
};

export default Dashboard;
