package com.api.surveytool.service;

import com.api.surveytool.model.Answer;
import com.api.surveytool.model.Question;
import com.api.surveytool.repository.AnswerRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AnswerService {
    private final AnswerRepository answerRepository;
    private final QuestionService questionService;

    public AnswerService(AnswerRepository answerRepository, QuestionService questionService) {
        this.answerRepository = answerRepository;
        this.questionService = questionService;
    }

    public Answer createAnswer(Long questionId, Answer answer) {
        Question question = questionService.getQuestionById(questionId);
        answer.setQuestion(question);
        return answerRepository.save(answer);
    }

    public List<Answer> getAnswersByQuestionId(Long questionId) {
        Question question = questionService.getQuestionById(questionId);
        return question.getAnswers();
    }
}
