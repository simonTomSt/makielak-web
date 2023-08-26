import { Card, Typography } from '@/components';
import { t } from '@/translations';

const Dashboard = () => {
  return (
    <Card className='p-4'>
      <Typography variant='h2'>{t.admin.welcome_title}</Typography>
      <Typography className='my-3'>{t.admin.welcome_desc}</Typography>
      <Typography>{t.admin.welcome_help}</Typography>
    </Card>
  );
};

export default Dashboard;
