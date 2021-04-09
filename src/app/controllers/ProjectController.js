import * as Yup from 'yup';

import Project from '../models/Project';
import Participant from '../models/Participant';

class ProjectController {
  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      date_init: Yup.date().required(),
      date_finish: Yup.date().required(),
      value_project: Yup.string().required(),
      risk_project: Yup.string().required(),
      participants: Yup.array().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const projectExist = await Project.findOne({
      where: { name: req.body.name },
    });

    if (projectExist) {
      return res.status(400).json({ error: 'Project already exists' });
    }

    const {
      name,
      date_init,
      date_finish,
      value_project,
      risk_project,
      participants,
    } = req.body;

    const project = await Project.create({
      name,
      date_init,
      date_finish,
      value_project,
      risk_project,
    });

    const savedParticipant = await Participant.bulkCreate(
      participants.map(el => ({ ...el, project_id: project.id }))
    );
    return res.json({ project, participants: savedParticipant });
  }

  async index(req, res) {
    return res.json({});
  }

  async show(req, res) {
    return res.json({});
  }

  async update(req, res) {
    return res.json({});
  }

  async delete(req, res) {
    return res.json({});
  }
}

export default new ProjectController();
