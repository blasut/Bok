gem 'minitest'
ENV['RACK_ENV'] = 'test'

require 'minitest/unit'
require 'minitest/pride'
require 'rack/test'
MiniTest::Unit.autorun
