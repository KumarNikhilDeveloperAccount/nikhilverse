import identityData from '@/content/profile/identity.json';
import bioData from '@/content/profile/bio.json';
import storyData from '@/content/profile/story.json';
import resumeData from '@/content/profile/resume.json';
import faqData from '@/content/profile/faq.json';
import roleFitData from '@/content/profile/role-fit.json';

import itsmData from '@/content/knowledge/itsm.json';
import incidentData from '@/content/knowledge/incident-management.json';
import changeData from '@/content/knowledge/change-management.json';
import infraData from '@/content/knowledge/infrastructure.json';

import dxcData from '@/content/companies/dxc.json';
import glossaryData from '@/content/glossary/glossary.json';
import missionsData from '@/content/playgrid/missions.json';
import quizData from '@/content/knowledge/quiz.json';

// Profile Exports
export const getIdentity = () => identityData;
export const getBio = () => bioData;
export const getStory = () => storyData;
export const getResume = () => resumeData;
export const getFaqs = () => faqData;
export const getRoleFits = () => roleFitData;

// Knowledge Exports
export const getKnowledgePacks = () => [itsmData, incidentData, changeData, infraData];
export const getITSM = () => itsmData;
export const getIncidentManagement = () => incidentData;
export const getChangeManagement = () => changeData;
export const getInfrastructure = () => infraData;

// Ecosystem Exports
export const getCompanies = () => [dxcData];
export const getGlossary = () => glossaryData;

// Playgrid Exports
export const getMissions = () => missionsData;
export const getQuizQuestions = () => quizData;
