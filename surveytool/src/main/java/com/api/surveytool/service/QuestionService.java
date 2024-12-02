package com.api.surveytool.service;

import com.api.surveytool.model.Question;
import com.api.surveytool.model.Survey;
import com.api.surveytool.repository.QuestionRepository;
import org.springframework.stereotype.Service;

@Service
public class QuestionService {
    private final QuestionRepository questionRepository;
    private final SurveyService surveyService;

    public QuestionService(QuestionRepository questionRepository, SurveyService surveyService) {
        this.questionRepository = questionRepository;
        this.surveyService = surveyService;
    }

    public Question createQuestion(Long surveyId, Question question) {
        Survey survey = surveyService.getSurveyById(surveyId);
        question.setSurvey(survey);
        return questionRepository.save(question);
    }

    public void deleteQuestion(Long id) {
        questionRepository.deleteById(id);
    }

    public Question updateQuestion(Long id, Question newQuestionData) {
        return questionRepository.findById(id)
                .map(question -> {
                    question.setText(newQuestionData.getText());
                    return questionRepository.save(question);
                })
                .orElseThrow(() -> new RuntimeException("Question not found"));
    }

    public Question getQuestionById(Long id) {
        return questionRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Question not found"));
    }
}
