import { Router } from 'express';

import ProjectController from './app/controllers/ProjectController';

const routes = new Router();

routes.get('/projetos', ProjectController.index);
routes.get('/projetos/:id', ProjectController.show);
routes.post('/projetos', ProjectController.store);
routes.put('/projetos/:id', ProjectController.update);
routes.delete('/projetos/:id', ProjectController.delete);

export default routes;
