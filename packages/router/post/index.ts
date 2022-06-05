import {Router} from 'express';

import read from './read';
import search from './search';

const router = Router();

router.get("",read);
router.get("/search",search);


export default router;