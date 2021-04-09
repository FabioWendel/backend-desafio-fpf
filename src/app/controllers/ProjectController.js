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

    
    const [{ cpf }] = req.body.participants;

    const cpfExist = await Participant.findOne({
      where: { cpf: cpf},
    });

    if (cpfExist) {
      return res.status(400).json({ error: 'CPF already exists' });
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
    const projects = await Project.findAll({
      include: [
        {
          model: Participant,
          as: 'participants',
        },
      ],
    });

    return res.json(projects);
  }

  async show(req, res) {
    const { id } = req.params;
    const project = await Project.findOne({
      where: {
        id: id,
      },
    });

    if (!project) {
      return res.status(400).json({ error: 'Project not exists.' });
    }

    return res.json(project);
  }

  async update(req, res) {
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

    const project = await Project.findOne({
      where: { name: req.body.name },
    });
    
    const [{ cpf }] = req.body.participants;

    const cpfExist = await Participant.findOne({
      where: { cpf: cpf},
    });

    if (cpfExist) {
      return res.status(400).json({ error: 'CPF already exists' });
    }

    const { participants, ...rest } = req.body;

    const {
      name,
      date_init,
      date_finish,
      value_project,
      risk_project,
    } = await project.update(rest);

    await project.save();

    const updatedParticipants = [];

    await Participant.destroy({ where: { project_id: project.id } });

    const promises = participants.map(async el => {
      const participant = await Participant.create({ ...el, project_id: project.id });
      updatedParticipants.push(participant);
    });

    await Promise.all(promises);

    return res.json({
      name,
      date_init,
      date_finish,
      value_project,
      risk_project,
      participants: updatedParticipants,
    });

  }

  async delete(req, res) {
    const { id } = req.params;

    const project = await Project.findOne({
      where: { id },
    });

    if (!project) {
      return res.status(401).json({ error: 'Project not found.' });
    }

    await project.destroy({ where: { id } });

    return res.status(200).json("Delected project "+id);
  }
}

export default new ProjectController();
