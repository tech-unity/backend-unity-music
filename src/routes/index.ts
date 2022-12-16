import peopleRoutes from '../routes/People/PeopleRoutes';
import instrumentRoutes from '../routes/Instruments/InstrumentRoutes';
import scaleRoutes from '../routes/Scales/ScalesRoutes';
import musicRoutes from '../routes/Musics/MusicRoutes';
import { Router } from 'express';

const router = Router();

router.use(peopleRoutes);
router.use(instrumentRoutes);
router.use(scaleRoutes);
router.use(musicRoutes);

// Middleware de erros padrao do express
router.use((error: any, req: any, res: any, next: any) => {
  const status = error.statusCode || 500;
  const message = !error.message ? 'Internal Error' : error.message;
  // const stack = error.stack;
  res.status(status).json({ message: message });
});

export default router;
